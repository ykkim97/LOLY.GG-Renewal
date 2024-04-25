import { Box, Drawer, Grid } from "@mui/material";
import styles from "./Community.module.css";
import LeftMenuSection from "./components/LeftMenuSection";
import { NavLink } from "react-router-dom";

type MenuType = {
    name : string;
    path : string;
}

type MenuArrType = MenuType[];

const menus : MenuArrType = [
    { name: "공지", path: "/community/notice" },
    { name: "뉴스", path: "/community/news" },
    { name: "자유", path: "/community/free" },
    { name: "유머", path: "/community/humor"},
    { name: "팁", path: "/community/tip"},
];

const Community = () => {
    return (
        <>
            <h3 className={styles['CommunityInfo-title']}>커뮤니티</h3>
            <Grid container className={styles['CommunityInfo-container']}>
                <Grid xs={2} className={styles['leftSection']}>
                    <Grid className={styles['leftMenu']}>
                        {menus.map((menu : MenuType, index : number) => {
                            return (
                                <Grid key={menu.name} className={styles['menuBox']}>
                                    {menu.name}
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
                <Grid xs={10} className={styles['boardContainerSection']}>
                    <div className={styles['filterSection']}>
                        filter section
                    </div>
                    <div className={styles['boardSection']}>
                        board section
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default Community;