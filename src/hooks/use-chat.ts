/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEventHandler, FormEvent, useState } from 'react';

interface UseChatArgs {
    onResponse: (response: any) => void;
    onError: (error: any) => void;
}

interface UseChatReturn {
    messages: any[];
    setMessages: React.Dispatch<React.SetStateAction<any[]>>;
    input: string;
    handleInputChange: ChangeEventHandler<HTMLTextAreaElement>;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    isLoading: boolean;
}

export function useChat({ onResponse, onError }: UseChatArgs): UseChatReturn {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = async () => {
        if (!input.trim()) return; // Prevent submitting empty input
        setIsLoading(true);

        console.log('input', input);
        try {
            const response = await fakeApiCall(input); // Replace with your API call
            onResponse(response);
            setMessages(prevMessages => [...prevMessages, response]);
        } catch (error) {
            onError(error);
        } finally {
            setIsLoading(false);
            setInput(''); // Clear input after submission
        }
    };

    return {
        messages,
        setMessages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
    };
}

// Example placeholder for an API call
const fakeApiCall = async (message: string): Promise<any> => {
    return new Promise(resolve => {
        setTimeout(() => resolve({ text: message, id: Date.now() }), 1000);
    });
};
