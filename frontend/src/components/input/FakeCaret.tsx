const FakeCaret = () => {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-pulse">
      <div className="w-px h-8 bg-black" />
    </div>
  );
};
export default FakeCaret;
