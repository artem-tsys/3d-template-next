import React, { useMemo } from 'react';
import { ConfigProvider, Slider } from 'antd';
import type { SliderSingleProps, SliderRangeProps } from 'antd/es/slider';

type CustomSliderProps = SliderSingleProps | SliderRangeProps;

export default function CustomSlider(props: CustomSliderProps) {
	const theme = useMemo(() => {
		return {
			components: {
				Slider: {
					trackBg: 'var(--color-gold)',
					trackHoverBg: 'var(--color-gold)',
					railBg: 'var(--color-dark-300)',
					railHoverBg: 'var(--color-dark-300)',
					handleColor: 'var(--color-dark-300)',
					handleActiveColor: 'var(--color-gold)',
					railSize: 2,
				},
			},
			token: {
				fontSize: 10
			},
		} as const;
	}, []);

	return (
		<ConfigProvider theme={theme}>
			<Slider {...props} />
		</ConfigProvider>
	);
}
