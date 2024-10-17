import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f8d7da",
      color: "#721c24",
      textAlign: "center",
      padding: "20px",
    },
    title: {
      fontSize: "3rem",
      marginBottom: "10px",
    },
    message: {
      fontSize: "1.5rem",
      marginBottom: "20px",
    },
    details: {
      fontSize: "1.2rem",
      marginBottom: "30px",
    },
    link: {
      padding: "10px 15px",
      backgroundColor: "#721c24",
      color: "white",
      borderRadius: "5px",
      textDecoration: "none",
    },
    linkHover: {
      backgroundColor: "#f5c6cb",
      color: "#721c24",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Oops!</h1>
      <p style={styles.message}>Sorry, an unexpected error has occurred.</p>
      <p style={styles.details}>
        <i>{error.statusText || error.message}</i>
      </p>
      <a
        href="/"
        style={styles.link}
        onMouseOver={(e) =>
          (e.currentTarget.style = { ...styles.link, ...styles.linkHover })
        }
        onMouseOut={(e) => (e.currentTarget.style = styles.link)}
      >
        Go back to Home
      </a>
    </div>
  );
}
