import * as Dialog from '@radix-ui/react-dialog';
import classNames from 'classnames';
import { FiX } from 'react-icons/fi';
import { HStack } from './flexbox';

const ModalManager = () => (
    <Dialog.Root defaultOpen={true}>
        <Dialog.Trigger />
        <Dialog.Overlay
            style={{
                zIndex: 10000
            }}
            className="fixed inset-0 bg-overlay focus:outline-none active:outline-none outline-none"
        />
        <Dialog.Content
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none active:outline-none outline-none"
        >
            <div
                className={classNames(
                    "flex animate-animated max-h-screen animate-fadeIn animate-faster flex-col mx-auto focus:outline-none active:outline-none outline-none w-[800px] rounded bg-pink"
                )}
            >
                <div
                    className={
                        "w-full pl-6 pr-4 pt-6 flex relative items-center justify-between"
                    }
                >
                    <button
                        onClick={() => {}}
                        className="bg-white rounded-full flex items-center justify-center w-[32px] h-[32px] hover:bg-[#F9F9FA]"
                    >
                        <FiX size={20} />
                    </button>
                </div>
                <HStack className='w-full justify-center p-6'>
                    Sign-up for Newsletter Modal
                </HStack>
            </div>
        </Dialog.Content>
    </Dialog.Root>
);

export default ModalManager;