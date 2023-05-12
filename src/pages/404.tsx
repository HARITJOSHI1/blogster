import styles from "./404.module.css";

const Custom404 = () => {
  return (
    <section className="h-full flex flex-col justify-center items-center">
      <h1 className={`text-4xl ${styles.title!}`}>404 - Oops a bad request</h1>
      <p className="text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
    </section>
  );
};

export default Custom404;
