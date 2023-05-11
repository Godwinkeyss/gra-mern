import Spinner from 'react-bootstrap/Spinner';

export default function LoadingBox() {
  return (
    <div className='spi'>
    <Spinner animation="border" role="status" className=''>
      <span className="visually-hidden ">Loading...</span>
    </Spinner>
    </div>
  );
}