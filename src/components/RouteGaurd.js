
import { favouritesAtom	 } from "store";
import { searchHistoryAtom } from "store";
import { useAtom } from "jotai";
import { getFavourites } from "lib/userData";
import { getHistory } from "lib/userData";
import { isAuthenticated } from "lib/authenticate";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
export default function RouteGuard(props) {
    const router = useRouter();
    const [favelist,setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [authorized, setAuthorized] = useState(false);
    const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];
    useEffect(() => {
        
        // on initial load - run auth check
        authCheck(router.pathname);
    
        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck);
    
        // unsubscribe from events in useEffect return function
        return () => {
          router.events.off('routeChangeComplete', authCheck);
        };
      }, []);
    
    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
          setAuthorized(false);
          router.push('/login');
        } else {
          setAuthorized(true);
        }
    }
  var gaurd = null;
  if(authorized == true)
  {
    return <>{props.children}</>
  }
  else
  {
    return null;
  }

   
  }