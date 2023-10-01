import { useState, useEffect } from "react";
import AddPost from "../../components/AddPost";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { SinglePostProps, Posts } from "../../model/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useGetPostsQuery } from "../../redux/services/api";
import FeedCard from "../../components/FeedCard";
import { increment, decrement } from "../../redux/features/paginationSlice";
import Modal from "../../components/Modal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const { pageNumber } = useAppSelector((state) => state.counter);

  const handlePageIncrease = () => {
    dispatch(increment());
  };
  const handlePageDecrease = () => {
    dispatch(decrement());
  };
  const handleModal = () => {
    setShowModal((prev) => !prev);
  };
  console.log(pageNumber);
  const { data, isFetching, isError, error } = useGetPostsQuery(pageNumber, {
    refetchOnFocus: true,
  });
  console.log(data);

  return (
    <div>
      <h2 className="my-8 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
        Posts
      </h2>
      <button onClick={handleModal}>Add post</button>

      <div className="gap-4 grid sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
        {isFetching ? (
          <p>Loading..</p>
        ) : data?.length > 0 ? (
          data?.map((post: SinglePostProps, index: number) => (
            <FeedCard key={index} post={post} showComment={true} />
          ))
        ) : (
          <p>No results. Please try again</p>
        )}
      </div>
      <div className="flex m-auto">
        {data && (
          <div className="flex m-auto gap-5">
            <button onClick={handlePageDecrease}>
              <GrFormPrevious />
            </button>
            <p>{pageNumber}</p>
            <button onClick={handlePageIncrease}>
              <GrFormNext />
            </button>
          </div>
        )}
      </div>
      {showModal && (
        <Modal>
          <AddPost openModal={showModal} handleModal={handleModal} />
        </Modal>
      )}
    </div>
  );
}
