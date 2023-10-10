import {
    Backdrop,
    Box,
    Fade,
    Modal as MaterialModal,
    useMediaQuery,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import s from './modal.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    deleteAcct,
    deleteInfo,
    archiveInfo,
} from '../../redux/user/userOperations';
import CustomButton from 'components/CustomButton/CustomButton';
import { toast } from 'react-toastify';

const ModalAcct = props => {
    const dispatch = useDispatch();
    const { handleClose, modalState } = props;
    const [typeText, setTypeText] = useState('');
    const isMobile = useMediaQuery('(max-width: 480px)');


    const archiveMessage = "Are you sure that you want to Archive all of your data.  this will move all of your current data to the Archive and you will have to start a new Calculator and Dairy"
    const diaryMessage = "Are you sure that you want to Delete all of your data.  this will remove all of your current data and you will have to start a new Calculator and Dairy"
    const accountMessage = "Are you sure that you want to Delete your accout.  You will no longer be able to login and will need to create a new account"

    const changeHandler = async e => {
        const { value } = e.target;
        console.log('value', value)
        setTypeText(value)
        console.log('typeText', typeText)

    }

    const closeModal = () => {

        setTypeText("");
        handleClose()

    }

    const runOption = async () => {
        console.log('modalState.myValue', modalState.myValue)
        console.log('enterText', typeText)

        if (modalState.myValue === typeText) {
            let response = ""
            switch (modalState.myValue) {
                case 'archive':
                    response = await dispatch(archiveInfo())
                    console.log(response)
                    if (response.payload === 200) {
                        toast.success('Archive Success!', {
                            position: 'top-right',
                            autoClose: 3000,
                            className: 'success-toast',
                        });
                    }
                    closeModal()
                    break;
                case 'dairy':
                    response = await dispatch(deleteInfo())
                    console.log(response)
                    if (response.payload === 200) {
                        toast.success('Delete Data Success!', {
                            position: 'top-right',
                            autoClose: 3000,
                            className: 'success-toast',
                        });
                    }
                    closeModal()
                    break;
                case 'acct':
                    response = await dispatch(deleteAcct())
                    console.log(response)
                    if (response.payload === 200) {
                        toast.success('Delete Account Success!', {
                            position: 'top-right',
                            autoClose: 3000,
                            className: 'success-toast',
                        });
                    }
                    closeModal()

                    break;
                default:

                    break;
            }
        }
    }


    return (
        <>
            <MaterialModal
                style={{ top: isMobile && 83 }}
                open={modalState.open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                        sx: { top: isMobile && 83, backgroundColor: '#2121211f' },
                    },
                }}
                disableScrollLock={isMobile ? true : false}

            >
                <Fade in={modalState.open}>
                    <Box>
                        <div className={s.modalBox}>
                            <span className={s.closeButton} onClick={closeModal}>
                                ✕
                            </span>
                            {modalState.myValue === 'archive' ?
                                <h3> {archiveMessage}</h3> : (modalState.myValue === 'dairy' ? <h3> {diaryMessage}</h3> : <h3> {accountMessage}</h3>)}
                            <p className={s.ptag}>type <span className={s.messageSpan}> {modalState.myValue}</span> and click submit.</p>
                            <TextField id="outlined-basic" label={modalState.myValue} variant="standard" onChange={changeHandler}
                                value={typeText} style={{ marginBottom: '20px' }} />

                            <CustomButton color="orange"
                                size="small" variant="contained" onClick={runOption} style={{ marginRight: '20px', width: "120px" }}>
                                Submit
                            </CustomButton>
                            <CustomButton color="orange"
                                size="small" variant="contained" onClick={closeModal} style={{ width: "120px" }}>
                                Cancel
                            </CustomButton>
                        </div>
                    </Box>
                </Fade>
            </MaterialModal>
        </>
    )
}

export default ModalAcct;
