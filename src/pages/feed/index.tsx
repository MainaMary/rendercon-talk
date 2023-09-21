import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Comment } from "../../model/types";
import ConfirmModal from "../../components/ConfirmModal";
import useLocalStorage from "../../customhooks/useLocalStorage";
import { setPostId, setEdit } from "../../redux/features/postSlice";
import { useAppDispatch } from "../../redux/hooks";
import {
  useGetSinglePostQuery,
  useGetAllPostsCommentsQuery,
} from "../../redux/services/api";
import EditComment from "../../components/EditComment";
import { useParams } from "react-router-dom";

export default function SingleFeed() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleModal = () => {
    setShowModal((prev) => !prev);
  };
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data: singlePostData, isLoading: isPostLoading } =
    useGetSinglePostQuery(id);
  const { data: comments, isLoading: isLoadingComments } =
    useGetAllPostsCommentsQuery(id);
  const { currentUser } = useLocalStorage();
  const handleConfirmModal = () => {
    setOpenModal((prev) => !prev);
  };
  const handleEdit = (id: string) => {
    dispatch(setPostId(id));
    handleModal();
  };
  const handleDelete = (id: string) => {
    dispatch(setPostId(id));
    dispatch(setEdit(false));
    handleConfirmModal();
  };
  console.log({ comments });
  return (
    <div>
      {id}
      {isPostLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="border-gray-400 border-b-[2px]">
          {singlePostData?.data?.title}
          <p>{singlePostData?.data?.body}</p>
        </div>
      )}
      <h3>Comments</h3>
      <div>
        {isLoadingComments ? (
          <p>Loading...</p>
        ) : (
          <div>
            {comments.data.map((comment: Comment) => (
              <div key={comment._id}>
                <div className="flex gap-8 items-center my-2">
                  <CgProfile />
                  <div className="">
                    <p>{comment.name}</p>
                    <p>{comment.createdAt}</p>
                  </div>
                </div>
                <p>{comment.body}</p>
                {currentUser.email === comment.email && (
                  <div>
                    <button onClick={() => handleEdit(comment._id)}>
                      edit
                    </button>
                    <p onClick={() => handleDelete(comment._id)}>delete</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {showModal && <EditComment />}
      {showModal && (
        <ConfirmModal openModal={openModal} handleModal={handleConfirmModal} />
      )}
    </div>
  );
}
