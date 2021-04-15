import Layout4players from '../../views/design/Layouts/Layout4players';
import Layout5players from '../../views/design/Layouts/Layout5players';
import Layout6players from '../../views/design/Layouts/Layout6players';
import Layout7players from '../../views/design/Layouts/Layout7players';



function LayoutSwitcher({playeramount}){
    switch(playeramount){
        case 4:
            return <Layout4players/>;
        case 5:
            return <Layout5players/>;
        case 6:
            return <Layout6players/>;
        case 7:
            return <Layout7players/>;
    }
}
export default LayoutSwitcher;