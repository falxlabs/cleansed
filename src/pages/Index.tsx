import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Temporarily redirect to dashboard until landing page is implemented
    navigate('/dashboard');
  }, [navigate]);

  return null;
};

export default Index;