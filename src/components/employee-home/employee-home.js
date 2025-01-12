
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";

export function HomeComponent() {
  const navigate = useNavigate();
  const [cookies] = useCookies(); // Added unused `removeCookies` as a placeholder for future functionality

  useEffect(() => {
    if (!cookies["userName"]) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  return (
    <div className="container-fluid d-flex justify-content-between">
      <div>
        <h2>Dashboard</h2>
        <div className="d-flex justify-content-end mb-4">
          <Link to="/create" className="btn btn-primary">
            Create Employee
          </Link>
        </div>

        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            width: "100%",
            fontWeight: "bold",
            fontSize: "34px",
          }}
        >
          Welcome to the Admin Panel
        </p>

        <div className="d-flex justify-content-between flex-wrap">
          {/* Employee Cards */}
          {[
            { src: "img/dev-m1.jpg", title: "Software Developer" },
            { src: "img/dev-f2.jpg", title: "HR" },
            { src: "img/dev-f1.jpg", title: "Software Tester" },
            { src: "img/dev-m2.jpg", title: "Software Developer" },
            { src: "img/man-m1.jpg", title: "Manager" },
          ].map((item, index) => (
            <div key={index} className="me-2">
              <img
                src={item.src}
                alt={item.title}
                style={{
                  width: "280px",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h5 className="text-center mt-2">{item.title}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

