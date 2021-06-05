import { Player } from '@engine/world/actor/player/player';
import { ActionHook, getActionHooks } from '@engine/world/action/hooks';
import { advancedNumberHookFilter, questHookFilter } from '@engine/world/action/hooks/hook-filters';
import { ActionPipe, RunnableHooks } from '@engine/world/action/index';
import { Npc } from '../actor/npc/npc';


/**
 * Defines a button action hook.
 */
export interface PrayerActionHook extends ActionHook<PrayerAction, PrayerActionHandler> {
    // The npc world id that was clicked on after choosing the spell
    npcworldId?: number;
    // The IDs of the UI widgets that the buttons are on.
    widgetIds?: number[];
    // The child ID or list of child IDs of the button(s) within the UI widget.
    buttonIds?: number | number[];
    // Whether or not this item action should cancel other running or queued actions.
    cancelActions?: boolean;
}


/**
 * The button action hook handler function to be called when the hook's conditions are met.
 */
export type PrayerActionHandler = (buttonAction: PrayerAction) => void | Promise<void>;


/**
 * Details about a button action being performed.
 */
export interface PrayerAction {
    // The npc world id that was clicked on after choosing the spell
    npc: Npc;
    // The player performing the action.
    player: Player;
    // The ID of the UI widget that the button is on.
    widgetId: number;
    // The child ID of the button within the UI widget.
    buttonId: number;
}


/**
 * The pipe that the game engine hands button actions off to.
 * @param npc
 * @param player
 * @param widgetId
 * @param buttonId
 */
const PrayerActionPipe = (npc:Npc, player: Player, widgetId: number, buttonId: number): RunnableHooks<PrayerAction> => {
    console.info(`You used prayer`);

    // Find all object action plugins that reference this location object
    const matchingHooks = getActionHooks<PrayerActionHook>('button');

    return {
        hooks: matchingHooks,
        actionPosition: player.position,
        action: {
            npc,
            player,
            widgetId,
            buttonId
        }
    }
    
    
};


/**
 * Button action pipe definition.
 */
export default [ 'magic_on_npc', PrayerActionPipe ] as ActionPipe;
