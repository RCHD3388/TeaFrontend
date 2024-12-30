export const GetBadReqMsg = (defaultMsg: String, err: any) => {
  let error = err.graphQLErrors[0];
  if (error.code == "BAD_REQUEST") {
    let curError = error.original?.message || error.message;
    let msg = ""
    if (typeof curError == "string") msg = curError;
    if (typeof curError == "object") msg = curError[0];
    return msg
  } else {
    return defaultMsg
  }
}
