import { useGetReletedVideosQuery } from "../../../features/api/apiSlice";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ id, title }) {

    const {  data: relatedVideos, isLoading, isError } = useGetReletedVideosQuery({ id, title });

    let content = null;

    if (isLoading) {
        content = (
            <>
                <RelatedVideoLoader />
                <RelatedVideoLoader />
                <RelatedVideoLoader />
                <RelatedVideoLoader />
            </>
        );
    }

    if (!isLoading && isError) {
        content = (
            <div className="col-span-full lg:col-auto">
                <p className="text-red-500">Failed to load related videos.</p>
            </div>
        );
    }

    if (!isLoading && !isError && relatedVideos?.length === 0) {
        content = (
            <div className="col-span-full lg:col-auto">
                <p className="text-red-500">No related videos found.</p>
            </div>
        );
    }

    if (!isLoading && !isError && relatedVideos?.length > 0) {
        content = (
        <div className="space-y-4">
            {relatedVideos.filter(video => video.id !== id).map((video) => (
                <RelatedVideo key={video.id} video={video} />
            ))}
        </div>
    );

    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    );
}
}

