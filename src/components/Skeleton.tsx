const Skeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <>
      <div role="status" className="w-full animate-pulse">
        {new Array(count).map((i: any) => {
          return (
            <div
              className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"
              key={i}
            ></div>
          );
        })}
      </div>
    </>
  );
};

export { Skeleton };
