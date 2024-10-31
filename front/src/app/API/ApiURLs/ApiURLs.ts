interface ApiUrlsIn {
    readonly USER : string,
}

const url = "http://localhost:8000/";

const ApiUrls: ApiUrlsIn = {
    USER : url + "api/register",
}

export default ApiUrls;