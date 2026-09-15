import React, { useRef, useState, useEffect } from 'react';
import { Animated, PanResponder, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '@/theme';

type PriceSliderProps = {
  min: number;
  max: number;
  initialMin: number;
  initialMax: number;
  onValuesChange: (min: number, max: number) => void;
};

export function PriceSlider({ min, max, initialMin, initialMax, onValuesChange }: PriceSliderProps) {
  const [localMin, setLocalMin] = useState(initialMin);
  const [localMax, setLocalMax] = useState(initialMax);
  const sliderWidth = useRef(0);

  // Position animated values (0 to 1)
  const posMin = useRef(new Animated.Value((initialMin - min) / (max - min))).current;
  const posMax = useRef(new Animated.Value((initialMax - min) / (max - min))).current;

  useEffect(() => {
    setLocalMin(initialMin);
    setLocalMax(initialMax);
    posMin.setValue((initialMin - min) / (max - min));
    posMax.setValue((initialMax - min) / (max - min));
  }, [initialMin, initialMax, min, max]);

  const updateValuesFromPos = (valMin: number, valMax: number) => {
    const newMin = Math.round(min + valMin * (max - min));
    const newMax = Math.round(min + valMax * (max - min));
    setLocalMin(newMin);
    setLocalMax(newMax);
    onValuesChange(newMin, newMax);
  };

  const createPanResponder = (isMinThumb: boolean) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (evt, gestureState) => {
        if (sliderWidth.current === 0) return;
        const delta = gestureState.dx / sliderWidth.current;
        
        if (isMinThumb) {
          // @ts-ignore
          let newPos = posMin._value + delta;
          // @ts-ignore
          if (newPos < 0) newPos = 0;
          // @ts-ignore
          if (newPos > posMax._value) newPos = posMax._value;
          posMin.setValue(newPos);
        } else {
          // @ts-ignore
          let newPos = posMax._value + delta;
          // @ts-ignore
          if (newPos > 1) newPos = 1;
          // @ts-ignore
          if (newPos < posMin._value) newPos = posMin._value;
          posMax.setValue(newPos);
        }
      },
      onPanResponderRelease: () => {
        // @ts-ignore
        updateValuesFromPos(posMin._value, posMax._value);
      },
    });
  };

  const minResponder = useRef(createPanResponder(true)).current;
  const maxResponder = useRef(createPanResponder(false)).current;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Custom Price Range (₹/min)</Text>
      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.input}
            value={localMin.toString()}
            onChangeText={(t) => {
              const v = parseInt(t) || min;
              setLocalMin(v);
              posMin.setValue((v - min) / (max - min));
              onValuesChange(v, localMax);
            }}
            keyboardType="number-pad"
            placeholder="Min"
          />
        </View>
        <Text style={styles.dash}>-</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.input}
            value={localMax.toString()}
            onChangeText={(t) => {
              const v = parseInt(t) || max;
              setLocalMax(v);
              posMax.setValue((v - min) / (max - min));
              onValuesChange(localMin, v);
            }}
            keyboardType="number-pad"
            placeholder="Max"
          />
        </View>
      </View>
      <Text style={styles.hint}>Drag slider to adjust or tap numbers to type directly.</Text>
      
      <View 
        style={styles.sliderTrackContainer}
        onLayout={(e) => { sliderWidth.current = e.nativeEvent.layout.width; }}
      >
        <View style={styles.sliderTrackBg} />
        <Animated.View 
          style={[
            styles.sliderTrackFill,
            {
              left: posMin.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
              width: Animated.subtract(posMax, posMin).interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] })
            }
          ]} 
        />
        <Animated.View 
          style={[styles.thumb, { left: posMin.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} 
          {...minResponder.panHandlers}
        />
        <Animated.View 
          style={[styles.thumb, { left: posMax.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} 
          {...maxResponder.panHandlers}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.md },
  label: { ...Typography.body, fontWeight: '600', color: Colors.cosmosPlum, marginBottom: Spacing.sm },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  inputContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: Colors.borderSubtle, borderRadius: Radius.md, paddingHorizontal: Spacing.md, backgroundColor: Colors.backgroundWhite, height: 44 },
  currencySymbol: { ...Typography.body, color: Colors.textSecondary, marginRight: 4 },
  input: { flex: 1, ...Typography.body, color: Colors.textPrimary },
  dash: { ...Typography.body, color: Colors.textSecondary },
  hint: { ...Typography.caption, color: Colors.textTertiary, marginTop: Spacing.md, marginBottom: Spacing.xl },
  sliderTrackContainer: { height: 24, justifyContent: 'center', position: 'relative' },
  sliderTrackBg: { height: 4, backgroundColor: Colors.borderSubtle, borderRadius: 2, width: '100%' },
  sliderTrackFill: { position: 'absolute', height: 4, backgroundColor: Colors.teal, borderRadius: 2 },
  thumb: { position: 'absolute', width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.backgroundWhite, borderWidth: 2, borderColor: Colors.teal, top: 0, marginLeft: -12, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
});
