import { Alert } from 'antd';
import * as React from 'react';

interface IErrorBoundaryProps {
    // 出错时的界面提示
    description?: string;
    // 被包裹的子组件
    children?: React.ReactElement<any> | string;
}

export default class ErrorBoundary extends React.Component<
    IErrorBoundaryProps,
    any
> {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
        };
    }
    componentDidCatch(error, errorInfo) {
        // Display fallback UI
        this.setState({
            error,
            errorInfo,
        });
        // You can also log the error to an error reporting service
    }

    getContent = () => {
        const { error } = this.state;
        const { description } = this.props;
        return (
            <Alert
                style={{ margin: 20 }}
                showIcon
                type="error"
                message="🤣 出错了"
                description={description || error.message || error.toString()}
            />
        );
    }

    render() {
        if (this.state.errorInfo) {
            // You can render any custom fallback UI
            return this.getContent();
        }
        return this.props.children;
    }
}
