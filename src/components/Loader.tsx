import AnimatedEllipsis from "@/components/AnimatedEllipsis";

export const Loader = ({ text }: { text?: string }) => {
  return (
    <div className="z-50 fixed inset-0 flex flex-col justify-center items-center bg-neutral bg-opacity-30 min-h-full">
      <div className="loading loading-lg loading-spinner" />
      {text && (
        <div className="mt-4">
          {text}
          <AnimatedEllipsis />
        </div>
      )}
    </div>
  );
};
