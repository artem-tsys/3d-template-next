import { List, type RowComponentProps } from 'react-window';
import { useEffect } from "react";
import useFilterStore from "../../hooks/use-filter.ts";
import styles from "./filter.module.css";

const Row = ({ index, style, data }: RowComponentProps<{ data: any }>) => {
	const item = data[index];
	// placeholder для підвантаження/порожнього місця
	if (!item) {
		return (
			<div style={style} className={styles.listItemPlaceholder}>
				Завантаження...
			</div>
		);
	}
	return (
		<div style={style} className={styles.listItem}>
			<div className="flex gap-6 items-center">
				<div className="font-medium">{item.type}</div>
				<div className="text-sm text-gray-500">{item.rooms}</div>
				<div className="text-sm text-gray-500">{item.floor}</div>
				<div className="text-sm text-gray-500">{item.area}</div>
			</div>
			<button aria-label="favourite" className={styles.btn}>♡</button>
		</div>
	);
};


export function FilterList() {
	const { list, fetchList, listHasMore, listLoading, appliedFilters } = useFilterStore();
	
	// fetch on mount and when filters change
	useEffect(() => {
		fetchList(true); // replace
	}, [fetchList, appliedFilters]);
	
	// load more when near end
	// const handleItemsRendered = useCallback(({ visibleStopIndex }: any) => {
	// 	if (visibleStopIndex >= list.length - 3 && !listLoading && listHasMore) {
	// 		fetchList(false); // append
	// 	}
	// }, [list.length, listLoading, listHasMore, fetchList]);
	//
	// const itemCount = listHasMore ? list.length + 1 : list.length;
	
	return (
		<div>
			<div className="flex items-center justify-between text-sm text-gray-600 mb-3">
				<div className="flex gap-4">
					<div>Тип</div>
					<div>Кімнат</div>
					<div>Поверх</div>
					<div>Площа м²</div>
				</div>
				<div>До обраного</div>
			</div>
			
			<List
				// height={300}
				// itemCount={itemCount}
				rowHeight={72}
				rowComponent={Row}
				rowCount={list.length}
				rowProps={{ data: list }}
				// onItemsRendered={handleItemsRendered}
				// itemData={{ items: list }}
			/>
			<div className="mt-4 text-sm text-gray-700">Знайдено: {list.length} {listHasMore ? '...' : ''}</div>
		</div>
	);
}
