const useButton = ({ text }) => {
  return (
    <>
      <button className=" font-semibold text-[#8C6A88] border-[#8C6A88] border-b-4 rounded-md bg-[#E8E8E8] px-10 py-2">
        {text}
      </button>
    </>
  );
};

export default useButton;
