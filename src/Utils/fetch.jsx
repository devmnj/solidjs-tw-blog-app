import { createClient } from "@urql/core";

// export default async function  Fetch(){ 
//  return (await fetch(`${MOCK_API}`)).json();
// }

// export   async function fetchAPI   (id) {
//     const data= await (await fetch(`${MOCK_API}/${id}`)).json() 
//     //console.log('Fetch API'+ data);
//   return    data
// }

export const client = createClient({
  url: API_GQL,
});

