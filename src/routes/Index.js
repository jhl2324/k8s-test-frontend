import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Add logic that check user's authentication
    return navigate(`/home`);
  });

  return <div>Index Page</div>;
}
