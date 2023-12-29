import RegardForm from '@/components/home/RegardForm';
import Navbar from '@/components/navbar/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="w-96 mx-auto pt-20">
        <RegardForm />
      </div>
    </div>
  );
};

export default Home;
