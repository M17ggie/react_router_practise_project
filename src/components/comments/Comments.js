import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from '../comments/CommentsList'
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const { sendRequest, status, data: loadedComment } = useHttp(getAllComments);
  const { quotesId } = params;

  useEffect(() => {
    sendRequest(quotesId)
  }, [quotesId, sendRequest])
  const addedCommentHandler = () => {

  }

  let comments;

  if (status === 'pending') {
    comments = (<div className='centered'><LoadingSpinner /></div>);
  }

  if (status === 'completed' && (loadedComment || loadedComment.length > 0)) {
    return <CommentsList comments={loadedComment} />
  }

  if (status === 'completed' && (!loadedComment || loadedComment.length === 0)) {
    return <p className='centered'>Bummer! No comments added yet!</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quotesId={params.quotesId} onAddedComment={addedCommentHandler} />}
      {comments}
    </section>
  );
};

export default Comments;
