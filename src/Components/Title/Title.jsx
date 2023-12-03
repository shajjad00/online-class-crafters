const Title = ({ text }) => {
  return (
    <div>
      <h2 className=" text-3xl text-center my-4">{text}</h2>
      <div className="divider divider-primary  max-w-xs mx-auto"></div>
    </div>
  );
};

export default Title;
