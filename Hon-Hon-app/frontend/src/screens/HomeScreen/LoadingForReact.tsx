import { StyleSheet, Text, View,Image } from 'react-native'
import { Svg, G, Circle, CircleProps } from 'react-native-svg'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedProps, useSharedValue, withTiming, AnimatedProps, Easing, useAnimatedStyle, cancelAnimation } from 'react-native-reanimated'
import colors from '../../styles/color'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

type PropType = {
    timing: number
    onTimeOut: Function
    setTimeDown: (remainingTime: number) => void
    onStart:boolean,
}

const data = [
    { key: 1, image: require('../../assets/images/dog/dog-step1.png') },
    { key: 2, image: require('../../assets/images/dog/dog-step2.png') },
    { key: 3, image: require('../../assets/images/dog/dog-step3.png') },
  ];

const CIRCUMFERENCE = 800
const RADIUS = CIRCUMFERENCE / (2 * Math.PI)
const STROKE_WIDTH = 10
const HALF_CIRCLE = RADIUS + STROKE_WIDTH
const DIAMETER = HALF_CIRCLE * 2

const LoadingForReact: React.FC<PropType> = ({ timing, onTimeOut, setTimeDown ,onStart}): React.JSX.Element => {
    const progress = useSharedValue(0)
    const rotateZ = useSharedValue(0)
    const [time, setTime] = useState(timing * 60)

    useEffect(() => {
            if (timing!==0 && onStart === true) {
                
                progress.value = withTiming(1, { duration: (timing * 60 * 1000) + 1000, easing: Easing.linear, })
                rotateZ.value = withTiming(360, { duration: (timing * 60 * 1000) + 1000, easing: Easing.linear })

                const interval = setInterval(() => {
                    setTime(prev => {
                        if (prev <= 0) {
                            clearInterval(interval)
                            onTimeOut(prev)
                            return 0
                        }
                        // if (prev > time-5) {
                        //     onCancel()
                        // }
                        return prev - 1
                    })
                }, 1000)

                return () => clearInterval(interval)
        
            }if (onStart === false) {
                const stopAnimation = () => {
                    cancelAnimation(progress); // หยุดแอนิเมชันทันที
                    cancelAnimation(rotateZ); // หยุดแอนิเมชันทันที
                };

                stopAnimation()
            }
    }, [onStart])

    useEffect(() => {
        setTimeDown(time)
    }, [time])

    const animatedProps = useAnimatedProps<AnimatedProps<CircleProps>>(() => {
        return {
            strokeDashoffset: CIRCUMFERENCE * (1 - progress.value)
        }
    }, [progress.value])

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${rotateZ.value}deg` }],
        };
    }, [rotateZ.value]);

    const formattedTime = `${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`
    const formattedTime2 = `${Math.floor((timing * 60 - time) / 60)
        .toString()
        .padStart(1, "0")}`;

    const getImage = () => {
        const firstQuarter = timing*60 / 3
        const secondQuarter = firstQuarter*2
        
        if (time < secondQuarter && time >= firstQuarter) {
            return 1
        }
        if(time < firstQuarter) {
            return 2
        }
        return 0
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ position: 'absolute', zIndex: 10 }}>
                <Animated.View style={[styles.Circle, rStyle]} >
                    <View style={styles.miniCircle}></View>
                </Animated.View>
            </View>
            <View style={{position:'absolute',top:20}}><Text style={{fontSize:17,color:colors.textSecondary}}>Time in Focus: {formattedTime2} min</Text></View>
            <Svg width={DIAMETER} height={DIAMETER} viewBox={`0 0 ${DIAMETER} ${DIAMETER}`} style={{ zIndex: 1 }} >
                <G origin={`${HALF_CIRCLE},${HALF_CIRCLE}`} rotation={'-90'} >
                    <AnimatedCircle
                        animatedProps={animatedProps}
                        fill={'transparent'}
                        stroke={'#6484DC'}
                        r={RADIUS}
                        cx={'50%'}
                        cy={'50%'}
                        strokeWidth={STROKE_WIDTH}
                        strokeLinecap='round'
                        strokeDasharray={CIRCUMFERENCE}
                    />
                    <Circle
                        fill={'transparent'}
                        stroke={'#98CCF9'}
                        r={RADIUS}
                        cx={'50%'}
                        cy={'50%'}
                        strokeWidth={STROKE_WIDTH}
                        strokeLinecap='round'
                        strokeDasharray={CIRCUMFERENCE}
                        strokeOpacity={0.5}
                    />
                </G>
            </Svg>
            <View style={styles.centerImage}>
                <Image source={data[getImage()].image} style={styles.imageSize} />
            </View>
            <View style={styles.blueBack}></View>
            <View style={styles.centerCountTime}>
                <Text style={styles.timerText}>{formattedTime}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    timerText: {
        fontSize: 60,
        position: 'absolute',
        color: '#4C62A4'
    },
    Circle: {
        position: 'relative',
        width: DIAMETER,
        height: DIAMETER,
        backgroundColor: 'transparent',
        borderRadius: DIAMETER
    },
    miniCircle: {
        position: 'absolute',
        top: -2,
        right: '46%',
        width: 25,
        height: 25,
        backgroundColor: '#4C62A4',
        borderRadius: 20,
    },
    centerCountTime:{
        position:'absolute',
        bottom:25,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    centerImage:{
        position:'absolute'
    },
    imageSize:{
        width:200,
        resizeMode:'contain'
    },
    blueBack:{
        position:'absolute',
        width:DIAMETER-30,
        height:DIAMETER-30,
        backgroundColor:'#6685DD',
        top:73,
        left:14.5,
        zIndex:-1,
        borderRadius:DIAMETER
    },
    groundBack:{
        position:'absolute',
        width:DIAMETER-30,
        height:DIAMETER-30,
        backgroundColor:'#6685DD',
        top:78,
        left:15,
        zIndex:-1,
        borderRadius:DIAMETER
    }
})

export default LoadingForReact
