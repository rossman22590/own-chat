import { Options, query } from "stook-graphql";
import { Provider, Session, Token, LoginSuccessPayload, Setting, AddProviderInput, AddSessionInput, AddTokenInput, DeleteTokenInput, MutationLoginByGithubArgs, MutationLoginByGoogleArgs, MutationLoginByPersonalTokenArgs, UpdateSettingInput } from "./types";
import { ADD_PROVIDER, ADD_SESSION, ADD_TOKEN, DELETE_TOKEN, LOGIN_BY_GITHUB, LOGIN_BY_GOOGLE, LOGIN_BY_PERSONAL_TOKEN, UPDATE_SETTING } from "./gql";

class ApiService {
  async addProvider(args: AddProviderInput = {} as AddProviderInput, opt: Options = {}) {
    return await query<Provider>(ADD_PROVIDER, { ...opt, variables: { input: args } })
  }

  async addSession(args: AddSessionInput = {} as AddSessionInput, opt: Options = {}) {
    return await query<Session>(ADD_SESSION, { ...opt, variables: { input: args } })
  }

  async addToken(args: AddTokenInput = {} as AddTokenInput, opt: Options = {}) {
    return await query<Token>(ADD_TOKEN, { ...opt, variables: { input: args } })
  }

  async deleteToken(args: DeleteTokenInput = {} as DeleteTokenInput, opt: Options = {}) {
    return await query<boolean>(DELETE_TOKEN, { ...opt, variables: { input: args } })
  }

  async loginByGithub(args: MutationLoginByGithubArgs = {} as MutationLoginByGithubArgs, opt: Options = {}) {
    return await query<LoginSuccessPayload>(LOGIN_BY_GITHUB, { ...opt, variables: args })
  }

  async loginByGoogle(args: MutationLoginByGoogleArgs = {} as MutationLoginByGoogleArgs, opt: Options = {}) {
    return await query<LoginSuccessPayload>(LOGIN_BY_GOOGLE, { ...opt, variables: args })
  }

  async loginByPersonalToken(args: MutationLoginByPersonalTokenArgs = {} as MutationLoginByPersonalTokenArgs, opt: Options = {}) {
    return await query<LoginSuccessPayload>(LOGIN_BY_PERSONAL_TOKEN, { ...opt, variables: args })
  }

  async updateSetting(args: UpdateSettingInput = {} as UpdateSettingInput, opt: Options = {}) {
    return await query<Setting>(UPDATE_SETTING, { ...opt, variables: { input: args } })
  }
}

export const apiService = new ApiService();
