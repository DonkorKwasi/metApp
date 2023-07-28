import { getToken, readToken } from "./authenticate";

export async function addToFavourites(id)
{
   var token =  getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'PUT',
       
        headers: {
          'content-type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
      });
    
      const data = await res.json();
      if (res.status === 200) {
   console.log('did this work')
        return data;
      } else {
       return [];
      }
}


export async function removeFromFavourites(id) 
{
    var token =  getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'DELETE',
       
        headers: {
          'content-type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
      });
    
      const data = await res.json();
      if (res.status === 200) {
   
        return data;
      } else {
       return [];
      }

}

export async function getFavourites() 
{
  var token =  getToken();
  
    
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favour/please`, {
      method: 'GET',
    
      headers: {
        'content-type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
    });
  
    const data = await res.json();
console.log(data);

return (data)
    
      
}
export async function addToHistory(id) 
{
    var token =  getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'PUT',
       
        headers: {
          'content-type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
      });
    
      const data = await res;
      if (res.status === 200) {
   
        return data;
      } else {
       return [];
      }
}
export async function removeFromHistory(id) 
{
    var token =  getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'DELETE',
       
        headers: {
          'content-type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
      });
    
      const data = await res.json();
      if (res.status === 200) {
   
        return data;
      } else {
       return [];
      }
}
export async function getHistory() 
{
    var token =  getToken();
  
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method: 'GET',
      
        headers: {
          'content-type': 'application/json',
          'Authorization': `JWT ${token}`,
        },
      });
    
      const data = await res.json();
      console.log(data);
      return (data)
}