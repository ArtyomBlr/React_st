import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <>
      <p>Error 404! Not Found!</p>
      <Link to="/">
        <button className="btn-primary">Back Home</button>
      </Link>
    </>
  )
}

export default Page404;