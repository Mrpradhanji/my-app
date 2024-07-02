import Image from "next/image";
import AddAlbumForm from './components/AlbumForm'
import NewTrack from "./components/TrackForm"
import AlbumForm from "./components/AlbumForm";
export default function Home() {
  return (
    <main>
      <div >
       <NewTrack/>
        <AlbumForm/>
      </div>
    </main>     
  );
}
