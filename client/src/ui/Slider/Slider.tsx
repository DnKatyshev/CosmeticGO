import { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import debounce from 'lodash.debounce';
import './slider.scss'


function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 3000;

export default function MinimumDistanceSlider({updateParams} : {updateParams: (key: "minPrice" | "maxPrice", value: any) => void}) {

  const [value, setValue] = useState<number[]>([0, 42000]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 42000 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue as number[]);
    }

    updateParams('minPrice', newValue[0])
    updateParams('maxPrice', newValue[1])
  };

  console.log('value', value)


    return (
        <div className="slider-box">
            <div className="slider-box__inputs">
                <div className="slider-box__input">{value[0]} ₽</div>
                <div className="slider-box__input">{value[1]} ₽</div>
            </div>
            <div className="slider-box__slider">
                <Slider
                    value={value}
                    min={0}
                    max={42000}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                    className='slider'
                />
            </div>
        </div>
    );
}