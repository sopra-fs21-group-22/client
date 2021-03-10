import React from 'react';


export default function UserStatus({ user }) {
    return (
        <span className={user.status == "ONLINE" ? "badge bg-success" : "badge bg-light"}>
            {user.status}
        </span>
    )
}