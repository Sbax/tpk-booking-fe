import AnimatedEllipsis from "@/components/AnimatedEllipsis";

export const Loader = ({ text = "Giusto un attimo" }: { text?: string }) => {
  return (
    <div className="top-0 left-0 z-50 fixed inset-0 flex flex-col justify-center items-center bg-neutral bg-opacity-30 m-0 min-h-full">
      <div className="loading loading-lg loading-spinner" />
      <div className="mt-4">
        {text}
        <AnimatedEllipsis />
      </div>
    </div>
  );
};
