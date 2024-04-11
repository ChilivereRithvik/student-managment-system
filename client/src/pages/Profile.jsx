import React, { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState({});

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await axios.get('http://localhost:8080/api/v1/user/userapil/me', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (res.status === 200) {
            const data = await res.json();
            setUser(data);
          }
        } catch (err) {
          console.error(err);
        }
      };

      fetchUser();
    }, []);

  return (
    <div className="container">
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
     
      
    </div>
  );
}

export default Profile;
