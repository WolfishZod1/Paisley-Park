import AnimatedList from "../animatedList/AnimatedList";
import MapContainer from "./MapContainer";
import styles from "./style.module.scss";

type props = {
  refetchFunc: () => void;
  data: {
    label: string;
    type: string;
    desc: string;
    id: number;
    url: string;
  }[];
};

const MapComponent = ({ data, refetchFunc }: props) => {
  return (
    <div className={styles.map}>
      <div className={styles.tasks_cont}>
        <AnimatedList
          refetchFunc={refetchFunc}
          items={data}
          displayScrollbar={false}
        />
      </div>

      <MapContainer />
    </div>
  );
};

export default MapComponent;
