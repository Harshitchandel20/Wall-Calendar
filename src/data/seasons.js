/**
 * Seasonal data for each month — maps to hero images, accent colors,
 * and seasonal theme names reflecting Indian climate patterns.
 */

import januaryImg from '../assets/months/january.png';
import februaryImg from '../assets/months/february.png';
import marchImg from '../assets/months/march.png';
import aprilImg from '../assets/months/april.png';
import mayImg from '../assets/months/may.png';
import juneImg from '../assets/months/june.png';
import julyImg from '../assets/months/july.png';
import augustImg from '../assets/months/august.png';
import septemberImg from '../assets/months/september.png';
import octoberImg from '../assets/months/october.png';
import novemberImg from '../assets/months/november.png';
import decemberImg from '../assets/months/december.png';

const SEASONS = [
  {
    month: 0,
    name: 'January',
    season: 'Winter',
    image: januaryImg,
    accentColor: '#5B7FA5',
    accentLight: 'rgba(91, 127, 165, 0.12)',
    gradientAngle: '135deg',
    description: 'Misty Himalayan Peaks',
  },
  {
    month: 1,
    name: 'February',
    season: 'Winter',
    image: februaryImg,
    accentColor: '#C77D8A',
    accentLight: 'rgba(199, 125, 138, 0.12)',
    gradientAngle: '135deg',
    description: 'Cherry Blossoms',
  },
  {
    month: 2,
    name: 'March',
    season: 'Spring',
    image: marchImg,
    accentColor: '#E8A741',
    accentLight: 'rgba(232, 167, 65, 0.12)',
    gradientAngle: '135deg',
    description: 'Mustard Fields',
  },
  {
    month: 3,
    name: 'April',
    season: 'Summer',
    image: aprilImg,
    accentColor: '#D4783C',
    accentLight: 'rgba(212, 120, 60, 0.12)',
    gradientAngle: '135deg',
    description: 'Rajasthan Fort',
  },
  {
    month: 4,
    name: 'May',
    season: 'Summer',
    image: mayImg,
    accentColor: '#C9A52A',
    accentLight: 'rgba(201, 165, 42, 0.12)',
    gradientAngle: '135deg',
    description: 'Mango Orchards',
  },
  {
    month: 5,
    name: 'June',
    season: 'Monsoon',
    image: juneImg,
    accentColor: '#4A8B6F',
    accentLight: 'rgba(74, 139, 111, 0.12)',
    gradientAngle: '135deg',
    description: 'First Rains',
  },
  {
    month: 6,
    name: 'July',
    season: 'Monsoon',
    image: julyImg,
    accentColor: '#2E7D5F',
    accentLight: 'rgba(46, 125, 95, 0.12)',
    gradientAngle: '135deg',
    description: 'Western Ghats',
  },
  {
    month: 7,
    name: 'August',
    season: 'Monsoon',
    image: augustImg,
    accentColor: '#3A7CA5',
    accentLight: 'rgba(58, 124, 165, 0.12)',
    gradientAngle: '135deg',
    description: 'Kerala Backwaters',
  },
  {
    month: 8,
    name: 'September',
    season: 'Monsoon',
    image: septemberImg,
    accentColor: '#6B8E5A',
    accentLight: 'rgba(107, 142, 90, 0.12)',
    gradientAngle: '135deg',
    description: 'Terraced Fields',
  },
  {
    month: 9,
    name: 'October',
    season: 'Festive',
    image: octoberImg,
    accentColor: '#D4663E',
    accentLight: 'rgba(212, 102, 62, 0.12)',
    gradientAngle: '135deg',
    description: 'Dussehra Festival',
  },
  {
    month: 10,
    name: 'November',
    season: 'Festive',
    image: novemberImg,
    accentColor: '#C4922A',
    accentLight: 'rgba(196, 146, 42, 0.12)',
    gradientAngle: '135deg',
    description: 'Diwali Lights',
  },
  {
    month: 11,
    name: 'December',
    season: 'Winter',
    image: decemberImg,
    accentColor: '#7B8FA8',
    accentLight: 'rgba(123, 143, 168, 0.12)',
    gradientAngle: '135deg',
    description: 'Kashmir Snow',
  },
];

export function getSeasonData(month) {
  return SEASONS[month];
}

export default SEASONS;
