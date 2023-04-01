import { NextApiResponse } from 'next'
import { NextRequest } from 'next/server'
import { createParser } from 'eventsource-parser'

class ChatGPTError extends Error {
  statusCode?: number
  statusText?: string
  reason?: string
}

export const config = {
  runtime: 'edge',
}

// # https://platform.openai.com/docs/api-reference/chat/create
async function createStream(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const result = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    method: 'POST',
    body: req.body,
  })

  const { status, statusText } = result
  if (status !== 200) {
    const json = await result.json()
    let reason = ''
    try {
      reason = json?.error?.message
    } catch (err) {
      reason = result.statusText;
    }
    const msg = `ChatGPT error ${status}: ${reason}`;
    const error = new ChatGPTError(msg, { cause: json });
    error.statusCode = status;
    error.statusText = statusText;
    error.reason = msg
    throw error;
  }

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: any) {
        if (event.type === 'event') {
          const data = event.data
          if (data === '[DONE]') {
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta.content
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (e) {
            controller.error(e)
          }
        }
      }

      const parser = createParser(onParse)
      for await (const chunk of result.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return stream
}

const handler = async (req: NextRequest, _: NextApiResponse) => {
  try {
    const stream = await createStream(req)
    return new Response(stream)
  } catch (error: any) {
    const response = new Response(error, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  }
}

export default handler
