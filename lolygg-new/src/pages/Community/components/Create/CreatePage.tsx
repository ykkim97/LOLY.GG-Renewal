import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePage.module.css";
import { Button, Grid, TextField } from "@mui/material";

const CreatePage = () => {
    const token: string | null = localStorage.getItem('token');
    const navigate = useNavigate();

    // 로그인하지 않았다면 로그인페이지로 이동
    useEffect(() => {
        if (!token || token == '') {
            navigate('/login');
        }
    }, [])

    const handleCreatePost = () => {
        // 글 작성 로직
        // 작성된 글 데이터를 서버로 전송하는 등의 작업 수행
        console.log('글 작성 버튼 클릭');
    }

    return (
        <>
            <h3 className={styles['CommunityInfo-title']}>새 게시글</h3> 
            <Grid className={styles['container']}>
                <Grid container spacing={2} className={styles.formContainer}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="제목"
                            variant="outlined"
                            placeholder="글 제목을 입력해주세요."
                            className={styles['form-title']}
                            InputProps={{
                                style: {
                                    borderColor: 'green', // 테두리 색상 변경
                                    borderWidth: 2, // 테두리 두께 설정
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            label="내용"
                            variant="outlined"
                            placeholder="글 내용을 입력해주세요."
                            className={styles['form-content']}
                        />
                    </Grid>
                    <Grid item xs={12} className={styles['create-button-container']}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreatePost}
                            className={styles['create-button']}
                        >
                            글 작성
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default CreatePage;