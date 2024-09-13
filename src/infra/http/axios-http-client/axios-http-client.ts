import { HttpPostClient, HttpPostParams, HttpResponse } from "../../../data/protocols/http";
import axios from "axios";

// Adapter Pattern -> Adaptando 2 interfaces diferente
// O sistema não depende do axios
export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}