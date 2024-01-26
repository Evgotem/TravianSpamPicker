import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import './SpamListPage.css';
import { Button, List } from 'antd';


interface ISpamList {
	villageLink: string;
	accountName: string;
	troopsCount: string;
}

export const SpamListPage: FC = () => {

	const [spamList, setSpamList] = useState<ISpamList[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		axios.get('https://a7c5aa86377fe1aa.mokky.dev/spamList')
		.then(({data}) => setSpamList(data))
		.catch(error => console.error(error))
		.finally(() => setLoading(false));
	}, []);


	return (<div className={'spam_list_page'}>
		<List
			className={'list'}
			loading={loading}
			size="large"
			header={<div className={'spam_list_header'}>
				<div>Спам лист</div>
				<Button
					onClick={() => spamList.forEach(item => window.open(item.villageLink, "_blank"))}
					style={{background: 'green', color: 'white', borderColor: 'green'}}
				>
					Открыть все
				</Button>
			</div>}
			bordered
			dataSource={spamList}
			renderItem={(item) => <List.Item className={'list_item'}>
				<div className={'acc_name'}>{item.accountName}</div>
				<div>{item.troopsCount}</div>
				<Button
					type="primary"
					onClick={() => window.open(item.villageLink, "_blank")}
				>
					Открыть
				</Button>
			</List.Item>}
		/>
	</div>);
};
