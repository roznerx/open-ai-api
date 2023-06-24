import { NextResponse } from "next/server";


// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function GET(req: Request) {
   

   const { searchParams } = new URL(req.url)
   const query = searchParams.get('query')
   
    
    
    const fetchOptions:any = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip',
            'X-Subscription-Token': process.env.BRAVE_API_KEY
        }
    };
    
    const url = `https://api.search.brave.com/res/v1/web/search?q=${query}`;
    const response = await fetch(url, fetchOptions)
    const data = await response.json();
    
    

    return NextResponse.json({ info: data.web.results })
  
}
