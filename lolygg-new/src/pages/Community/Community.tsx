import { Box, Button, Drawer, Grid, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import styles from "./Community.module.css";
import LeftMenuSection from "./components/LeftMenuSection";
import { NavLink, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const [searchCondition, setSearchCondition] = useState<string>('');
    const handleChange = (event: SelectChangeEvent) => {
        setSearchCondition(event.target.value);
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
                            <Grid xs={8}>
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
                                    <InputLabel id="demo-select-small-label">검색조건</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={searchCondition}
                                        label="검색조건"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>선택안함</em>
                                        </MenuItem>
                                        <MenuItem value="hit">조회순</MenuItem>
                                        <MenuItem value="latest">최신순</MenuItem>
                                        <MenuItem value="like">좋아요순</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={1}>
                                <Button variant="contained" onClick={() => navigate(`/community/create`)}>글 작성</Button>
                            </Grid>
                        </Grid>
                        
                    </div>
                    <div className={styles['boardSection']}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: '5%' }} align="center">ID</TableCell>
                                    <TableCell sx={{ width: '75%' }} align="center">제목</TableCell>
                                    <TableCell sx={{ width: '10%' }} align="center">작성자</TableCell>
                                    <TableCell sx={{ width: '10%' }} align="center">작성일</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>1</TableCell>
                                        <TableCell>제목1</TableCell>
                                        <TableCell>작성자1</TableCell>
                                        <TableCell>2024-05-01</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>2</TableCell>
                                        <TableCell>제목2</TableCell>
                                        <TableCell>작성자2</TableCell>
                                        <TableCell>2024-05-02</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>3</TableCell>
                                        <TableCell>제목3</TableCell>
                                        <TableCell>작성자3</TableCell>
                                        <TableCell>2024-05-03</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default Community;