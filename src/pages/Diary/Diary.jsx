import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Container from 'components/Container/Container';
import Loader from 'components/Loader/Loader';
import { Paper } from '@mui/material';

import DiaryAddProductForm from 'components/DiaryAddProductForm/DiaryAddProductForm';
import DiaryCalendar from 'components/DiaryCalendar/DiaryCalendar';
import RightSideBar from 'components/RightSideBar/RightSideBar';
import DiaryList from '../../components/DiaryList/DiaryList';
import { useUser } from 'hooks/useUser';
import { SummaryContainer } from 'components/RightSideBar/SummaryContainer';
import DiaryAddButton from 'components/DiaryAddButton/DiaryAddButton';
import { setDiaryBackBtn } from 'redux/user/userSlice'; 
import useViewPort from 'hooks/useViewport';
import s from '../../components/RightSideBar/rightSideBar.module.css';
import { selectThemeMode } from 'redux/theme/themeSelectors';


function Diary() {
  const dispatch = useDispatch();
  const { diaryBackBtn } = useUser();
  const { width } = useViewPort();
  const [calendarDisplay, setCalendarDisplay] = useState('');
  const [formDisplay, setFormDisplay] = useState('');
  const [onMount, setOnMount] = useState(true);
  const themeMode = useSelector(selectThemeMode);
  console.log(themeMode);
  useEffect(() => {
    setOnMount(false);
  }, [dispatch]);

  function handleClick() {
    dispatch(setDiaryBackBtn(!diaryBackBtn));
  }

  useEffect(() => {
    if (diaryBackBtn === false) {
      setCalendarDisplay('block');
      setFormDisplay('none');
    } else {
      setCalendarDisplay('none');
      setFormDisplay('block');
    }
  }, [diaryBackBtn]);

  return (
    <div
      className="background Calc-DairyBackground"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <section className="top-bottom">
        <Container className="left-right">
          {onMount ? (
            <Loader />
          ) : width > 768 ? (
            <>
              <div>
                <DiaryCalendar />
                <DiaryAddProductForm />
                <DiaryList />
              </div>
            </>
          ) : (
            <>
              <div style={{ display: `${formDisplay}` }}>
                <DiaryAddProductForm diaryBackBtn={diaryBackBtn} />
              </div>
              <div style={{ display: `${calendarDisplay}` }}>
                <DiaryCalendar />
                <DiaryList />
                <DiaryAddButton onClick={handleClick} />
              </div>
            </>
          )}
        </Container>
      </section>
      <section className="no-bottom">
        <Container className="no-left-right">
          <Paper className={`${s.sidebarBox} ${themeMode === 'dark' ? s.darkMode : s.lightMode}` }/>
          <RightSideBar>
            <SummaryContainer />
          </RightSideBar>
        </Container>
      </section>
    </div>
  );
}

export default Diary;
