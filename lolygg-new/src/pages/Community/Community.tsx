import { Box, Drawer, Grid, InputBase } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import styles from "./Community.module.css";
import LeftMenuSection from "./components/LeftMenuSection";
import { NavLink } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from "react";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

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
    const [age, setAge] = useState<string>('');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

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
                        <Grid container sx={{ display:"flex",justifyContent:"space-between", alignItems:"center" }}>
                            <Grid xs={9}>
                                <Search >
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="검색"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                            </Grid>
                            <Grid xs={3}>
                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                    <InputLabel id="demo-select-small-label">Age</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        
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