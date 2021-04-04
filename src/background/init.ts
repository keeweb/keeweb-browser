import { backend } from './backend';
import { createUIMenus } from './ui';
import { startInternalIpc } from './internal-ipc';
import { startCommandListener } from './commands';
import { BackendConnectionState } from '../common/backend-connection-state';

chrome.runtime.onInstalled.addListener(async () => {
    startCommandListener();
    createUIMenus();
    startInternalIpc();

    await backend.init();
    if (backend.state === BackendConnectionState.NotConfigured) {
        chrome.runtime.openOptionsPage();
    }
});
