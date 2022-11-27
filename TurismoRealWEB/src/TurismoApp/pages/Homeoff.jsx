
import ImageSlider from '../components/ImageSlider';
import { SliderData } from '../components/SliderData';
import Header from '../components/Header';
import Titulo from '../components/Titulo';
import Titulo2 from '../components/Titulo2';
export const Homeoff = () => {
  return <div>        
     <h1 className="Bienvenida" >Bienvenido a Turismo Real</h1>      
     <ImageSlider slides={SliderData} />
     <Titulo />
     <Header />
     <Titulo2 />
      </div>
}
