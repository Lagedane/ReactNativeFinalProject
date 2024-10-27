import { StyleSheet } from "react-native";

import colors from "../../styles/color";

// Define and export styles for WelcomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  content: {
    width: "100%",
    height: 600,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    paddingBottom: 10,
    alignItems: 'center',
    position: "relative",
    padding: 40,
    paddingTop: 30,
    elevation: 5,
    overflow:'hidden'
  },
  logoContainer: {
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.background,
  },
  scrollView: {
    // flexGrow:1,
    paddingTop: 80,
    paddingBottom: 10,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 20,
    padding: 1,
    zIndex: 1,
  },
  circleButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 40
  },
  circleButtonDisable:{
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundComponent,
    borderRadius: 40
  },
  contentTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.secondary,
  },
  subContentTitle: {
    color: colors.textSecondary,
  },
  cardProfile: {
    width: '100%',
    height: 120,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: colors.backgroundComponent,
    marginBottom: 10,
    paddingHorizontal:20,
    borderRadius:15
  },
  ImgProfile:{
    width:80,
    height:80,
    backgroundColor:colors.base,
    borderRadius:40,
    overflow:'hidden'
  },
  textProfile:{
    color:colors.background,
    fontSize:30,
    fontWeight:'bold'
  },
  textPrimaryProfile:{
    color:colors.secondary,
    fontWeight:'bold',
    fontSize:16
  },
  imageStyle: {
    width: '100%', // หรือกำหนดตามที่ต้องการ
    height: '100%',
    resizeMode:'cover'
  },
  
  textSecondaryProfile:{
    color:colors.secondary,
    fontWeight:'bold',
    fontSize:14,
    marginTop:3
  },
  rowCategory:{
    flexDirection:'row',
    marginTop:7
  },
  category:{
    width:65,
    height:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.secondary,
    borderRadius:20,
    marginRight:5
  },
  textCategory:{
    color:colors.background,
    fontSize:12
  },
  overView: { 
    width: '100%', 
    height: 180, 
    backgroundColor: colors.backgroundComponent ,
    borderRadius:15,
    overflow:'hidden'
  },
  inputTitle:{
    width:'100%',
    height:50,
    marginBottom:20,
    paddingHorizontal:20,
    backgroundColor:'#FFFFF0',
    borderRadius:20,
    fontSize:16
  },
  centerButton:{
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:30
  },
  buttonCreate:{
    width:120,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:colors.secondary,
    borderRadius:50,
    marginTop:50
  },
  textButton:{
    color:colors.background,
    fontSize:18
  },
  selectImage:{
    position:'relative',
    width:120,
    height:120,
    alignItems:'center',
    backgroundColor:'#f5f5e4',
    borderRadius:100,
    overflow:'hidden'
  },
  selectImgText:{
    position:'absolute',
    width:'100%',
    height:30,
    alignItems:'center',
    bottom:0,
    backgroundColor: 'rgba(155,153,156,0.6)'
  },
  textImag:{
    marginTop:3,
    fontSize:10,
    fontWeight:'bold',
    color:colors.background
  },
  ImgShow:{
    width:'100%',
    height:'100%'
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 20,
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  closeButton: {
    width:180,
    backgroundColor: colors.background,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent:'center',
    marginBottom:10,
  },
  closeButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  confirmDeleteButton:{
    width: 100,
    marginHorizontal: 10,
    backgroundColor: colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  confirmDeleteButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: "bold",
  },
  textHeader:{
    fontSize:30,
    fontWeight: "bold",
    marginBottom:10,
    color:colors.background
  },
  textSub:{
    fontSize:15,
    color:colors.background,
    marginBottom:20
  },
  actionButton:{
    width:110,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.secondary,
    borderRadius:20,
    marginTop:20,
  },
  slider: {
    position:'absolute',
    width: 250,
    height: 70, // เพิ่มความสูงเพื่อรองรับปุ่ม Thumb
    backgroundColor: 'transparent', // ป้องกันพื้นหลังทับซ้อน
  },
  track: {
    height: 10, // ปรับความหนาของ track
    borderRadius: 5, // ทำให้โค้งมน
  },
  thumb: {
    width: 20, // ปรับขนาดปุ่ม thumb
    height: 20,
    backgroundColor: '#3E5AA9',
    borderRadius: 10,
  },
  profileSetting:{
    position:'absolute',
    bottom:-50,
    width:60,
    height:60,
    backgroundColor:'red',
    zIndex:120
  },
  deleteProfileButtonContainer:{
    flex: 1, 
    zIndex: 1,
  },
  deleteProfileButton:{
    position:'absolute',
    right:3,
    top:-40
  },
  circleCenter:{
    position:'relative',
    width:'100%',
    zIndex:100,
  },
  circleMusic:{
    position:'absolute',
    bottom:-80,
    right:25,
    width:75,
    height:75,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:60,
    zIndex:100,
    backgroundColor:colors.background
  },
  musicPopUp:{
    position:'absolute',
    bottom:-100,
    right:110,
    width:230,
    height:115,
    paddingVertical:15,
    paddingHorizontal:25,
    backgroundColor:colors.secondary,
    borderRadius:20
  },
  directionButton:{
    marginTop:15,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  buttonAction:{
    paddingVertical:5,
    paddingHorizontal:10,
    width:80,
    alignItems:'center',
    borderRadius:20
  }
});

export default styles;
