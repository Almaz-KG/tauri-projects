import ImagesTable from "./tables/ImagesTable";


export interface IImage {
  id: string;
  name: string;
  tag: string;
  size: string;
  created: string;
}

const images: IImage[] = []

export default function DockerImages() {
  return (
    <>
      <div className="col-span-12 xl:col-span-7 mt-4">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
          <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              In Use
            </h3>
          </div>
          <div className="max-w-full overflow-x-auto">
            <ImagesTable images={images} />
          </div>
        </div>
      </div>

      <div className="col-span-12 xl:col-span-7 mt-4">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
          <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Unused
            </h3>
          </div>
          <div className="max-w-full overflow-x-auto">
            <ImagesTable images={images} />
          </div>
        </div>
      </div>

      <div className="col-span-12 xl:col-span-7 mt-4">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
          <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Dangling
            </h3>
          </div>
          <div className="max-w-full overflow-x-auto">
            <ImagesTable images={images} />
          </div>
        </div>
      </div>
    </>
  );
}
