import { ReactNode } from 'react';

import { Container, Footer, UserInfo } from './styles';

type QuestionProps = {
	content: string;
	author: {
		name: string;
		avatar: string;
	};
	children?: ReactNode;
	isAnswered?: boolean;
	isHighlighted?: boolean;
};

export function Question({
	content,
	author,
	isAnswered = false,
	isHighlighted = false,
	children,
}: QuestionProps) {
	return (
		<Container answered={isAnswered} highlighted={isHighlighted && !isAnswered}>
			<UserInfo small>
				<img src={author.avatar} alt={author.name} />
				<span>{author.name}</span>
			</UserInfo>
			<p>{content}</p>
			<Footer>
				<UserInfo medium>
					<img src={author.avatar} alt={author.name} />
					<span>{author.name}</span>
				</UserInfo>
				<div>{children}</div>
			</Footer>
		</Container>
	);
}
